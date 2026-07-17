package tui

import "github.com/charmbracelet/bubbles/key"

type KeyMap struct {
	NextTab   key.Binding
	PrevTab   key.Binding
	Digits    key.Binding
	Scroll    key.Binding
	Top       key.Binding
	Bottom    key.Binding
	Focus     key.Binding
	Help      key.Binding
	Quit      key.Binding
	showFocus bool
}

func DefaultKeyMap() KeyMap {
	return KeyMap{
		NextTab: key.NewBinding(
			key.WithKeys("tab", "right", "l"),
			key.WithHelp("tab/→", "next tab"),
		),
		PrevTab: key.NewBinding(
			key.WithKeys("shift+tab", "left", "h"),
			key.WithHelp("shift+tab/←", "prev tab"),
		),
		Digits: key.NewBinding(
			key.WithKeys("1", "2", "3", "4", "5", "6"),
			key.WithHelp("1-6", "jump to tab"),
		),
		Scroll: key.NewBinding(
			key.WithKeys("up", "down", "k", "j", "pgup", "pgdown"),
			key.WithHelp("↑/↓", "scroll"),
		),
		Top: key.NewBinding(
			key.WithKeys("g", "home"),
			key.WithHelp("g", "top"),
		),
		Bottom: key.NewBinding(
			key.WithKeys("G", "end"),
			key.WithHelp("G", "bottom"),
		),
		Focus: key.NewBinding(
			key.WithKeys("enter"),
			key.WithHelp("enter", "fill in form"),
		),
		Help: key.NewBinding(
			key.WithKeys("?"),
			key.WithHelp("?", "toggle help"),
		),
		Quit: key.NewBinding(
			key.WithKeys("q", "ctrl+c", "esc"),
			key.WithHelp("q", "quit"),
		),
	}
}

func (k KeyMap) ShortHelp() []key.Binding {
	bindings := []key.Binding{k.NextTab, k.Scroll}
	if k.showFocus {
		bindings = append(bindings, k.Focus)
	}
	return append(bindings, k.Help, k.Quit)
}

func (k KeyMap) FullHelp() [][]key.Binding {
	return [][]key.Binding{
		{k.NextTab, k.PrevTab, k.Digits},
		{k.Scroll, k.Top, k.Bottom},
		{k.Focus, k.Help, k.Quit},
	}
}

// formKeyMap is shown in the help bar while the contact form has focus.
type formKeyMap struct{}

func (formKeyMap) ShortHelp() []key.Binding {
	return []key.Binding{
		key.NewBinding(key.WithKeys("tab"), key.WithHelp("tab", "next field")),
		key.NewBinding(key.WithKeys("shift+tab"), key.WithHelp("shift+tab", "prev field")),
		key.NewBinding(key.WithKeys("enter"), key.WithHelp("enter", "send (on button)")),
		key.NewBinding(key.WithKeys("esc"), key.WithHelp("esc", "back to navigation")),
	}
}

func (f formKeyMap) FullHelp() [][]key.Binding {
	return [][]key.Binding{f.ShortHelp()}
}
