
## Features Description

### Navigation Links
The component provides navigation links to:
- About Us
- Services
- Contact

### User Authentication
- For logged-in users:
    - Displays profile picture
    - Dropdown menu with:
        - User's name, email, and phone
        - My Profile link
        - Log out button
        - Remove Account option
- For non-logged-in users:
    - Displays Sign Up button

### User Session Management
- User information is stored in localStorage under 'user-info' key
- Logout functionality removes user data from localStorage
- Click outside dropdown closes the menu

## Usage Example

## Styling
The component uses a separate CSS file (`header.css`) for styling. Custom CSS classes include:
- `header-container`
- `header`
- `logo-container`
- `links-container`
- `nav-buttons`
- `profile-dropdown-container`
- `dropdown-menu`

## Notes
- The component uses a test profile picture (`profile_picture_test`)
- User authentication state is managed through localStorage
- The component uses React Router for navigation


## What to add: 
- API endpoint to get `full user data while logging in`
- pictures storage