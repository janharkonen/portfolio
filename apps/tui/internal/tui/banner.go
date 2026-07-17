package tui

import "strings"

// A tiny 5x5 pixel font rendered with block characters. Only the glyphs
// needed for "JAN HÄRKÖNEN" are defined; Ä and Ö get a diacritic row on top.
var glyphs = map[rune][5]string{
	'J': {"#####", "   # ", "   # ", "#  # ", " ##  "},
	'A': {" ### ", "#   #", "#####", "#   #", "#   #"},
	'N': {"#   #", "##  #", "# # #", "#  ##", "#   #"},
	'H': {"#   #", "#   #", "#####", "#   #", "#   #"},
	'R': {"#### ", "#   #", "#### ", "#  # ", "#   #"},
	'K': {"#   #", "#  # ", "###  ", "#  # ", "#   #"},
	'O': {" ### ", "#   #", "#   #", "#   #", " ### "},
	'E': {"#####", "#    ", "#### ", "#    ", "#####"},
	'Ä': {" ### ", "#   #", "#####", "#   #", "#   #"},
	'Ö': {" ### ", "#   #", "#   #", "#   #", " ### "},
	' ': {"     ", "     ", "     ", "     ", "     "},
}

var umlauts = map[rune]bool{'Ä': true, 'Ö': true}

const glyphWidth = 6 // 5 columns + 1 gap

// bannerWord renders one word of the pixel font, including the diacritic row.
func bannerWord(word string) string {
	runes := []rune(word)
	rows := make([]strings.Builder, 6)
	for _, r := range runes {
		g, ok := glyphs[r]
		if !ok {
			g = glyphs[' ']
		}
		if umlauts[r] {
			rows[0].WriteString(" # # ")
		} else {
			rows[0].WriteString("     ")
		}
		rows[0].WriteString(" ")
		for i, line := range g {
			rows[i+1].WriteString(line)
			rows[i+1].WriteString(" ")
		}
	}
	lines := make([]string, 0, 6)
	for _, b := range rows {
		lines = append(lines, strings.TrimRight(strings.ReplaceAll(b.String(), "#", "█"), " "))
	}
	// Drop the diacritic row if the word has no umlauts.
	if strings.TrimSpace(lines[0]) == "" {
		lines = lines[1:]
	}
	return strings.Join(lines, "\n")
}

// renderBanner renders the name as block letters, on one line when it fits,
// stacked when narrower, or as plain styled text on tiny terminals.
func renderBanner(s Styles, width int) string {
	const first, second = "JAN", "HÄRKÖNEN"
	oneLine := len([]rune(first)) + 1 + len([]rune(second)) // incl. joining space
	switch {
	case width >= oneLine*glyphWidth:
		return s.Banner.Render(bannerWord(first + " " + second))
	case width >= len([]rune(second))*glyphWidth:
		return s.Banner.Render(bannerWord(first) + "\n\n" + bannerWord(second))
	default:
		return s.Name.Render("Jan Härkönen")
	}
}
