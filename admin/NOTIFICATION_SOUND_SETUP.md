# Notification System Setup

## Overview
The admin panel now automatically notifies you when new messages are received from clients with both sound and browser notifications.

## How It Works

1. **Automatic Polling**: The system checks for new messages every 10 seconds
2. **Sound Notification**: When a new unread message is detected, a notification sound plays immediately
3. **Browser Notification**: A system notification appears in your device's notification center
4. **Fallback System**: If the audio file is not available, a generated beep sound plays instead

## Browser Notifications

When you first load the admin panel, you'll be asked to allow notifications. Click "Allow" to receive notifications in your device's notification section.

The notification will show:
- Title: "New Contact Message"
- Sender's name
- Preview of the message (first 100 characters)

## Adding a Custom Notification Sound (Optional)

The system works out-of-the-box with a generated beep sound. To use a custom sound:

1. Download or create a notification sound file (MP3 format recommended)
2. Name it `notification.mp3`
3. Place it in the `admin/public/` folder

### Recommended Sound Sources:
- **Freesound.org** - Free sound effects library
- **Zapsplat.com** - Free sound effects
- **Notification Sounds** - Search for "notification" or "alert" sounds

### Sound Recommendations:
- Duration: 1-2 seconds
- Volume: Moderate (not too loud)
- Type: Pleasant chime, bell, or beep

## Testing

1. Start the admin panel: `npm run dev`
2. Have someone submit a message through the client contact form
3. Wait up to 10 seconds - you should hear the notification sound
4. The message will appear in the Contact Messages list

## Configuration

To adjust the polling interval, edit `admin/src/contexts/DataContext.jsx`:

```javascript
const pollInterval = setInterval(() => {
  fetchContactMessages(true)
}, 10000) // Change 10000 to desired milliseconds (e.g., 5000 = 5 seconds)
```

## Troubleshooting

**No sound playing?**
- Check browser console for errors
- Ensure browser allows audio playback (some browsers block autoplay)
- Try clicking anywhere on the page first (browsers require user interaction for audio)
- The fallback generated sound should work even without the MP3 file

**No browser notifications?**
- Check if you allowed notifications when prompted
- Check your browser's notification settings (usually in browser settings or site permissions)
- On Windows: Check Windows notification settings
- On Mac: Check System Preferences > Notifications
- Try refreshing the page and allowing notifications again

**Sound plays multiple times?**
- This is expected if multiple new messages arrive
- Each new unread message triggers one notification sound

**Notifications not showing on mobile?**
- Ensure your browser supports notifications (Chrome, Firefox, Safari on iOS 16.4+)
- Check your device's notification settings for the browser app
- Some mobile browsers require the site to be added to home screen for notifications
