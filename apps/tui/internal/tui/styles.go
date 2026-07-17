package tui

import "github.com/charmbracelet/lipgloss"

var (
	accent    = lipgloss.AdaptiveColor{Light: "#6C50FF", Dark: "#A78BFA"}
	accentAlt = lipgloss.AdaptiveColor{Light: "#C2298A", Dark: "#F0A6D8"}
	subtle    = lipgloss.AdaptiveColor{Light: "#6B7280", Dark: "#8B949E"}
	borderCol = lipgloss.AdaptiveColor{Light: "#C4C9D4", Dark: "#3F4450"}
	badgeBg   = lipgloss.AdaptiveColor{Light: "#ECE8FF", Dark: "#332D4D"}
	okCol     = lipgloss.AdaptiveColor{Light: "#0E7A3C", Dark: "#4ADE80"}
	errCol    = lipgloss.AdaptiveColor{Light: "#B3261E", Dark: "#F87171"}
)

// Styles holds every lipgloss style used by the app. All styles are created
// from the per-session renderer so colors degrade to the client's profile.
type Styles struct {
	Doc         lipgloss.Style
	TabActive   lipgloss.Style
	TabInactive lipgloss.Style
	TabDivider  lipgloss.Style

	Banner  lipgloss.Style
	Name    lipgloss.Style
	Role    lipgloss.Style
	Subtle  lipgloss.Style
	Tagline lipgloss.Style
	Text    lipgloss.Style

	SectionTitle lipgloss.Style
	Label        lipgloss.Style
	Link         lipgloss.Style
	Badge        lipgloss.Style

	Card        lipgloss.Style
	CardTitle   lipgloss.Style
	CardCompany lipgloss.Style
	Period      lipgloss.Style

	StatusOK  lipgloss.Style
	StatusErr lipgloss.Style

	FormLabel     lipgloss.Style
	InputPrompt   lipgloss.Style
	Placeholder   lipgloss.Style
	ButtonFocused lipgloss.Style
	ButtonBlurred lipgloss.Style

	HelpKey  lipgloss.Style
	HelpDesc lipgloss.Style
}

func NewStyles(r *lipgloss.Renderer) Styles {
	return Styles{
		Doc:         r.NewStyle().Padding(0, 1),
		TabActive:   r.NewStyle().Bold(true).Foreground(accent).Padding(0, 2).Underline(true),
		TabInactive: r.NewStyle().Foreground(subtle).Padding(0, 2),
		TabDivider:  r.NewStyle().Foreground(borderCol),

		Banner:  r.NewStyle().Foreground(accent),
		Name:    r.NewStyle().Bold(true).Foreground(accent),
		Role:    r.NewStyle().Bold(true),
		Subtle:  r.NewStyle().Foreground(subtle),
		Tagline: r.NewStyle().Italic(true).Foreground(accentAlt),
		Text:    r.NewStyle(),

		SectionTitle: r.NewStyle().Bold(true).Foreground(accent).MarginBottom(1),
		Label:        r.NewStyle().Bold(true).Foreground(subtle).Width(10),
		Link:         r.NewStyle().Foreground(accentAlt).Underline(true),
		Badge:        r.NewStyle().Foreground(accent).Background(badgeBg).Padding(0, 1),

		Card:        r.NewStyle().Border(lipgloss.RoundedBorder()).BorderForeground(borderCol).Padding(0, 2).MarginBottom(1),
		CardTitle:   r.NewStyle().Bold(true).Foreground(accent),
		CardCompany: r.NewStyle().Bold(true),
		Period:      r.NewStyle().Foreground(subtle).Italic(true),

		StatusOK:  r.NewStyle().Foreground(okCol).Bold(true),
		StatusErr: r.NewStyle().Foreground(errCol).Bold(true),

		FormLabel:     r.NewStyle().Bold(true).Foreground(subtle),
		InputPrompt:   r.NewStyle().Foreground(accent),
		Placeholder:   r.NewStyle().Foreground(borderCol),
		ButtonFocused: r.NewStyle().Bold(true).Foreground(lipgloss.AdaptiveColor{Light: "#FFFFFF", Dark: "#FFFFFF"}).Background(accent).Padding(0, 3),
		ButtonBlurred: r.NewStyle().Foreground(subtle).Padding(0, 3).Border(lipgloss.RoundedBorder(), false).Faint(true),

		HelpKey:  r.NewStyle().Foreground(subtle).Bold(true),
		HelpDesc: r.NewStyle().Foreground(borderCol),
	}
}
