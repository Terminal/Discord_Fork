---
description: Play high-quality songs from Spotify alongside intelligent lyrics and music
  control commands
name: Spotify [Lyrics]
---

Spotify [Lyrics]
- A highly advanced, high-quality Discord bot that allows music playback via Spotify, utilising YouTube for streaming.
- Simply search with a song name (with or without a artist) and it will add the song closest to your search to the music queue.
- Provides accurate lyrics, sourced from a multitude of different public lyric databases. A lack of lyrics is rare for public songs.
- Simply: Add to your server, then run s!help to get started.

Commands:

s!play <search keywords>
Adds a spotify song to the queue. Search terms are case & symbol sensitive, refine your keywords as much as possible for the most accurate song request.

s!changeprefix <new prefix>
Changes the server wide prefix utilised for all SpotiLyrics commands, useful if you have multiple bots and there is a prefix conflict. Can't be more than 10 characters, not less than 1.

s!volume <new volume>
Changes the volume for the current queue of music playing in a voice channel, scale 1-200, with 100 being normal. Higher than 100 is not recommended.

s!restart
Starts the current song in the music queue to the start position.

s!skip
Skips the current song in the music queue and proceeds to the next song in queue.

s!pause
Pauses the current song in the music queue.

s!resume
Resumes the current song in the music queue.

s!stop
Clears the current music queue, and disconnects the bot from its current voice channel.

s!lyrics
Searches multiple sources for lyrics for the current playing song in the music queue, then sends them if they are available.

s!info
Detailed information regarding the current playing song in the music queue, according to Spotify statistics. Also visually displays the music queue, including who requested each song.
