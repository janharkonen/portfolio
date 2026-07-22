package tui

import (
	"fmt"
	"strings"

	"github.com/charmbracelet/lipgloss"

	"github.com/janharkonen/portfolio/apps/tui/internal/data"
)

const maxContentWidth = 84

func contentWidth(width int) int {
	return min(width-2, maxContentWidth)
}

// badgeRow renders tech badges, wrapping to the given width.
func badgeRow(s Styles, items []string, width int) string {
	var lines []string
	var row []string
	rowWidth := 0
	for _, item := range items {
		badge := s.Badge.Render(item)
		w := lipgloss.Width(badge) + 1
		if rowWidth+w > width && len(row) > 0 {
			lines = append(lines, strings.Join(row, " "))
			row, rowWidth = nil, 0
		}
		row = append(row, badge)
		rowWidth += w
	}
	if len(row) > 0 {
		lines = append(lines, strings.Join(row, " "))
	}
	return strings.Join(lines, "\n")
}

func card(s Styles, width int, parts ...string) string {
	inner := strings.Join(parts, "\n")
	return s.Card.Width(width).Render(inner)
}

func renderHome(d data.Data, s Styles, width int) string {
	w := contentWidth(width)
	p := d.Profile

	var b strings.Builder
	b.WriteString(renderBanner(s, w))
	b.WriteString("\n\n")
	b.WriteString(s.Role.Render(p.Role))
	b.WriteString(s.Subtle.Render("  ·  " + p.Location))
	b.WriteString("\n")
	b.WriteString(s.Tagline.Width(w).Render("“" + p.Line + "”"))
	b.WriteString("\n\n")

	links := [][2]string{
		{"github", p.GitHub},
		{"linkedin", p.Linkedin},
		{"scholar", p.Scholar},
		{"cv", p.CV},
		{"email", p.Email},
	}
	for _, l := range links {
		b.WriteString(s.Label.Render(l[0]) + " " + s.Link.Render(l[1]) + "\n")
	}
	b.WriteString("\n")
	b.WriteString(s.Subtle.Width(w).Render(
		"This is the terminal twin of janharkonen.fi — browse with the keys below, and say hi from the Contact tab."))
	return b.String()
}

func renderStack(d data.Data, s Styles, width int) string {
	w := contentWidth(width)
	var b strings.Builder
	b.WriteString(s.SectionTitle.Render("I'm most comfortable with"))
	b.WriteString("\n")
	b.WriteString(badgeRow(s, d.CoreStack, w))
	return b.String()
}

func renderExperience(d data.Data, s Styles, width int) string {
	w := contentWidth(width)
	var b strings.Builder
	b.WriteString(s.SectionTitle.Render("Work experience"))
	b.WriteString("\n")
	for _, e := range d.Experience {
		b.WriteString(card(s, w,
			s.CardTitle.Render(e.Role)+s.Subtle.Render(" @ ")+s.CardCompany.Render(e.Company),
			s.Period.Render(e.Period),
			"",
			s.Text.Width(w-6).Render(e.Description),
			"",
			badgeRow(s, e.Tech, w-6),
		))
		b.WriteString("\n")
	}
	return b.String()
}

func renderEducation(d data.Data, s Styles, width int) string {
	w := contentWidth(width)
	var b strings.Builder
	b.WriteString(s.SectionTitle.Render("Education"))
	b.WriteString("\n")
	for _, e := range d.Education {
		b.WriteString(card(s, w,
			s.CardTitle.Render(e.Degree)+s.Subtle.Render(" @ ")+s.CardCompany.Render(e.School),
			s.Period.Render(e.Period),
			"",
			s.Text.Width(w-6).Render(e.Description),
		))
		b.WriteString("\n")
	}
	return b.String()
}

func renderProjects(d data.Data, s Styles, width int) string {
	w := contentWidth(width)
	var b strings.Builder
	b.WriteString(s.SectionTitle.Render(fmt.Sprintf("Featured projects (%d)", len(d.Projects))))
	b.WriteString("\n")
	for _, p := range d.Projects {
		b.WriteString(card(s, w,
			s.CardTitle.Render(p.Name)+s.Period.Render(" ("+p.Year+")"),
			"",
			s.Text.Width(w-6).Render(p.Description),
			"",
			badgeRow(s, p.Tech, w-6),
		))
		b.WriteString("\n")
	}
	return b.String()
}
