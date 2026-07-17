// Package tui implements the Bubble Tea application served over SSH.
package tui

import (
	"strconv"
	"strings"

	"github.com/charmbracelet/bubbles/help"
	"github.com/charmbracelet/bubbles/key"
	"github.com/charmbracelet/bubbles/viewport"
	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/lipgloss"

	"github.com/janharkonen/portfolio/apps/tui/internal/data"
)

const (
	tabHome = iota
	tabStack
	tabExperience
	tabEducation
	tabProjects
	tabContact
	tabCount
)

var tabNames = [tabCount]string{"Home", "Stack", "Experience", "Education", "Projects", "Contact"}

type Model struct {
	data      data.Data
	styles    Styles
	keys      KeyMap
	help      help.Model
	viewport  viewport.Model
	contact   contactModel
	activeTab int
	width     int
	height    int
}

func New(d data.Data, r *lipgloss.Renderer, contactURL string, width, height int) Model {
	styles := NewStyles(r)
	h := help.New()
	h.Styles.ShortKey = styles.HelpKey
	h.Styles.ShortDesc = styles.HelpDesc
	h.Styles.ShortSeparator = styles.HelpDesc
	h.Styles.FullKey = styles.HelpKey
	h.Styles.FullDesc = styles.HelpDesc
	h.Styles.FullSeparator = styles.HelpDesc

	m := Model{
		data:     d,
		styles:   styles,
		keys:     DefaultKeyMap(),
		help:     h,
		viewport: viewport.New(width, height),
		contact:  newContactModel(d.Profile, styles, contactURL),
		width:    width,
		height:   height,
	}
	m.layout()
	return m
}

func (m Model) Init() tea.Cmd {
	return nil
}

func (m Model) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	switch msg := msg.(type) {
	case tea.WindowSizeMsg:
		m.width, m.height = msg.Width, msg.Height
		m.layout()
		return m, nil

	case contactResultMsg:
		var cmd tea.Cmd
		m.contact, cmd = m.contact.Update(msg)
		m.refreshContent()
		return m, cmd

	case tea.KeyMsg:
		if m.activeTab == tabContact && m.contact.focused {
			if msg.String() == "esc" {
				m.contact.Blur()
				m.refreshContent()
				return m, nil
			}
			var cmd tea.Cmd
			m.contact, cmd = m.contact.Update(msg)
			m.refreshContent()
			return m, cmd
		}

		switch {
		case key.Matches(msg, m.keys.Quit):
			return m, tea.Quit
		case key.Matches(msg, m.keys.Help):
			m.help.ShowAll = !m.help.ShowAll
			m.layout()
			return m, nil
		case key.Matches(msg, m.keys.NextTab):
			m.setTab((m.activeTab + 1) % tabCount)
			return m, nil
		case key.Matches(msg, m.keys.PrevTab):
			m.setTab((m.activeTab + tabCount - 1) % tabCount)
			return m, nil
		case key.Matches(msg, m.keys.Digits):
			if n, err := strconv.Atoi(msg.String()); err == nil && n >= 1 && n <= tabCount {
				m.setTab(n - 1)
			}
			return m, nil
		case key.Matches(msg, m.keys.Focus) && m.activeTab == tabContact:
			cmd := m.contact.Focus()
			m.refreshContent()
			return m, cmd
		case key.Matches(msg, m.keys.Top):
			m.viewport.GotoTop()
			return m, nil
		case key.Matches(msg, m.keys.Bottom):
			m.viewport.GotoBottom()
			return m, nil
		}
	}

	var cmds []tea.Cmd
	var cmd tea.Cmd
	if m.activeTab == tabContact {
		// Keep cursor blink and other component messages flowing to the form.
		m.contact, cmd = m.contact.Update(msg)
		cmds = append(cmds, cmd)
		m.refreshContent()
	}
	m.viewport, cmd = m.viewport.Update(msg)
	cmds = append(cmds, cmd)
	return m, tea.Batch(cmds...)
}

func (m *Model) setTab(tab int) {
	m.activeTab = tab
	m.keys.showFocus = tab == tabContact
	m.refreshContent()
	m.viewport.GotoTop()
}

func (m *Model) layout() {
	m.help.Width = m.width
	m.contact.setWidth(m.width)
	headerHeight := lipgloss.Height(m.renderTabs())
	footerHeight := lipgloss.Height(m.renderHelp())
	m.viewport.Width = m.width
	m.viewport.Height = max(m.height-headerHeight-footerHeight, 1)
	m.refreshContent()
}

func (m *Model) refreshContent() {
	var content string
	switch m.activeTab {
	case tabHome:
		content = renderHome(m.data, m.styles, m.width)
	case tabStack:
		content = renderStack(m.data, m.styles, m.width)
	case tabExperience:
		content = renderExperience(m.data, m.styles, m.width)
	case tabEducation:
		content = renderEducation(m.data, m.styles, m.width)
	case tabProjects:
		content = renderProjects(m.data, m.styles, m.width)
	case tabContact:
		content = m.contact.View()
	}
	m.viewport.SetContent(m.styles.Doc.Render(content))
}

func (m Model) renderTabs() string {
	var tabs []string
	for i, name := range tabNames {
		label := strconv.Itoa(i+1) + " " + name
		if i == m.activeTab {
			tabs = append(tabs, m.styles.TabActive.Render(label))
		} else {
			tabs = append(tabs, m.styles.TabInactive.Render(label))
		}
	}
	row := lipgloss.JoinHorizontal(lipgloss.Top, tabs...)
	divider := m.styles.TabDivider.Render(strings.Repeat("─", max(m.width, 0)))
	return row + "\n" + divider
}

func (m Model) renderHelp() string {
	var view string
	if m.activeTab == tabContact && m.contact.focused {
		view = m.help.View(formKeyMap{})
	} else {
		view = m.help.View(m.keys)
	}
	return m.styles.Doc.Render(view)
}

func (m Model) View() string {
	return m.renderTabs() + "\n" + m.viewport.View() + "\n" + m.renderHelp()
}
