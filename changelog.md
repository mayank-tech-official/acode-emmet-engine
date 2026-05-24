# Changelog

## v1.0.0
- Initial release
- Basic Emmet expansion system added

### Supported syntax
- div.class
- div#id
- div>child structure
- div*3 repetition

## v1.1
- Improved stability of Emmet expansion system
- Fixed issue where normal text was incorrectly converted into HTML tags
- Improved cursor positioning after tag expansion
- Better handling of invalid or unsupported input

### Bug Fixes
- Fixed auto-tag generation for non-HTML input
- Fixed cursor placement inside expanded tags

### Behavior Changes
- Only valid HTML tags are now expanded
- Invalid text is kept as plain text without modification

### Supported Features
- div.class
- div#id
- div*3 repetition
- Basic HTML tag expansion system

---

## Future Updates
- Tab stop system ($1, $2)
- Multi-cursor support
- JSX support
- CSS Emmet support
- Snippet engine upgrade
