package tui

import (
	"fmt"
	"io"
	"net/http"
	"net/url"
	"strings"
	"time"

	"github.com/charmbracelet/bubbles/textarea"
	"github.com/charmbracelet/bubbles/textinput"
	tea "github.com/charmbracelet/bubbletea"

	"github.com/janharkonen/portfolio/apps/tui/internal/data"
)

const (
	fieldName = iota
	fieldEmail
	fieldMessage
	fieldSubmit
	fieldCount
)

type contactResultMsg struct{ err error }

type contactModel struct {
	styles   Styles
	profile  data.Profile
	endpoint string

	name    textinput.Model
	email   textinput.Model
	message textarea.Model

	focused  bool
	focusIdx int
	sending  bool
	status   string
	statusOK bool
	width    int
}

func newContactModel(p data.Profile, s Styles, endpoint string) contactModel {
	name := textinput.New()
	name.Placeholder = "Your name"
	name.CharLimit = 100
	email := textinput.New()
	email.Placeholder = "you@example.com"
	email.CharLimit = 100
	message := textarea.New()
	message.Placeholder = "Hi Jan, \n\nI'd like to chat about..."
	message.CharLimit = 2000
	message.SetHeight(5)
	message.ShowLineNumbers = false

	for _, ti := range []*textinput.Model{&name, &email} {
		ti.PromptStyle = s.InputPrompt
		ti.PlaceholderStyle = s.Placeholder
		ti.Cursor.Style = s.InputPrompt
	}
	message.FocusedStyle.Prompt = s.InputPrompt
	message.BlurredStyle.Prompt = s.InputPrompt
	message.FocusedStyle.Placeholder = s.Placeholder
	message.BlurredStyle.Placeholder = s.Placeholder
	message.Cursor.Style = s.InputPrompt

	return contactModel{
		styles:   s,
		profile:  p,
		endpoint: endpoint,
		name:     name,
		email:    email,
		message:  message,
	}
}

func (c *contactModel) setWidth(width int) {
	c.width = width
	inputWidth := min(width-10, 60)
	c.name.Width = inputWidth
	c.email.Width = inputWidth
	c.message.SetWidth(inputWidth + 6)
}

// Focus gives keyboard focus to the form (first field).
func (c *contactModel) Focus() tea.Cmd {
	c.focused = true
	c.focusIdx = fieldName
	return c.applyFocus()
}

func (c *contactModel) Blur() {
	c.focused = false
	c.name.Blur()
	c.email.Blur()
	c.message.Blur()
}

func (c *contactModel) applyFocus() tea.Cmd {
	c.name.Blur()
	c.email.Blur()
	c.message.Blur()
	switch c.focusIdx {
	case fieldName:
		return c.name.Focus()
	case fieldEmail:
		return c.email.Focus()
	case fieldMessage:
		return c.message.Focus()
	}
	return nil
}

func (c contactModel) Update(msg tea.Msg) (contactModel, tea.Cmd) {
	switch msg := msg.(type) {
	case contactResultMsg:
		c.sending = false
		if msg.err != nil {
			c.status = "Could not send: " + msg.err.Error()
			c.statusOK = false
		} else {
			c.status = "Message sent — thank you! Jan will get back to you."
			c.statusOK = true
			c.name.Reset()
			c.email.Reset()
			c.message.Reset()
			c.Blur()
		}
		return c, nil

	case tea.KeyMsg:
		if !c.focused {
			return c, nil
		}
		switch msg.String() {
		case "tab", "down":
			// In the textarea, plain "down" moves within the text; tab advances.
			if c.focusIdx == fieldMessage && msg.String() == "down" && c.message.Line() < c.message.LineCount()-1 {
				break
			}
			c.focusIdx = (c.focusIdx + 1) % fieldCount
			return c, c.applyFocus()
		case "shift+tab", "up":
			if c.focusIdx == fieldMessage && msg.String() == "up" && c.message.Line() > 0 {
				break
			}
			c.focusIdx = (c.focusIdx + fieldCount - 1) % fieldCount
			return c, c.applyFocus()
		case "enter":
			switch c.focusIdx {
			case fieldName, fieldEmail:
				c.focusIdx++
				return c, c.applyFocus()
			case fieldSubmit:
				return c.submit()
			}
			// fieldMessage: fall through so the textarea inserts a newline.
		}
	}

	var cmd tea.Cmd
	switch c.focusIdx {
	case fieldName:
		c.name, cmd = c.name.Update(msg)
	case fieldEmail:
		c.email, cmd = c.email.Update(msg)
	case fieldMessage:
		c.message, cmd = c.message.Update(msg)
	}
	return c, cmd
}

func (c contactModel) submit() (contactModel, tea.Cmd) {
	if c.sending {
		return c, nil
	}
	name := strings.TrimSpace(c.name.Value())
	email := strings.TrimSpace(c.email.Value())
	message := strings.TrimSpace(c.message.Value())
	if name == "" || email == "" || message == "" {
		c.status = "Please fill in all three fields."
		c.statusOK = false
		return c, nil
	}
	if !strings.Contains(email, "@") {
		c.status = "That email address doesn't look right."
		c.statusOK = false
		return c, nil
	}
	c.sending = true
	c.status = ""
	return c, submitCmd(c.endpoint, name, email, message)
}

func submitCmd(endpoint, name, email, message string) tea.Cmd {
	return func() tea.Msg {
		form := url.Values{
			"name":    {name},
			"email":   {email},
			"message": {message},
		}
		req, err := http.NewRequest(http.MethodPost, endpoint, strings.NewReader(form.Encode()))
		if err != nil {
			return contactResultMsg{err}
		}
		req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
		// Astro's CSRF protection requires an Origin matching the site.
		if u, err := url.Parse(endpoint); err == nil {
			req.Header.Set("Origin", u.Scheme+"://"+u.Host)
		}
		client := &http.Client{Timeout: 10 * time.Second}
		resp, err := client.Do(req)
		if err != nil {
			return contactResultMsg{err}
		}
		defer resp.Body.Close()
		if resp.StatusCode != http.StatusOK {
			body, _ := io.ReadAll(io.LimitReader(resp.Body, 512))
			return contactResultMsg{fmt.Errorf("server responded %d: %s", resp.StatusCode, strings.TrimSpace(string(body)))}
		}
		return contactResultMsg{nil}
	}
}

func (c contactModel) View() string {
	s := c.styles
	w := contentWidth(c.width)
	var b strings.Builder

	b.WriteString(s.SectionTitle.Render("Get in touch"))
	b.WriteString("\n")

	details := s.Label.Render("email") + " " + s.Link.Render(c.profile.Email) + "\n" +
		s.Label.Render("phone") + " " + s.Text.Render(c.profile.Phone)
	b.WriteString(details)
	b.WriteString("\n\n")

	if !c.focused {
		b.WriteString(s.Subtle.Render("…or send a message straight from this terminal — press "))
		b.WriteString(s.CardTitle.Render("enter"))
		b.WriteString(s.Subtle.Render(" to start typing."))
		b.WriteString("\n\n")
	}

	form := []string{
		s.FormLabel.Render("Name"),
		c.name.View(),
		"",
		s.FormLabel.Render("Email"),
		c.email.View(),
		"",
		s.FormLabel.Render("Message"),
		c.message.View(),
		"",
		c.buttonView(),
	}
	b.WriteString(card(s, w, form...))

	if c.status != "" {
		b.WriteString("\n")
		if c.statusOK {
			b.WriteString(s.StatusOK.Width(w).Render(c.status))
		} else {
			b.WriteString(s.StatusErr.Width(w).Render(c.status))
		}
	}
	return b.String()
}

func (c contactModel) buttonView() string {
	label := "Send message"
	if c.sending {
		label = "Sending…"
	}
	if c.focused && c.focusIdx == fieldSubmit {
		return c.styles.ButtonFocused.Render("▶ " + label)
	}
	return c.styles.ButtonBlurred.Render(label)
}
