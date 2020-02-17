---
description: Brainfuck is a Discord-based interpreter for the esoteric programming
  language, brainfuck.
name: Brainfuck
---

**Background**

Brainfuck is an esoteric programming language created in 1993 by Urban Müller. 
The language contains only eight simple commands and an instruction pointer. 
While it is fully Turing-complete, it is not intended for practical use, but to challenge and amuse programmers.

**Diagram**
```
--------------------||---||--------
| 0 | 0 | 0 | 0 | 0 || 0 || 0 | 0 |
--------------------||---||--------
tape ---^     ^        ^
  cell --------        |
    head (pointer) ----
```

**Instructions**

`>` - Move the pointer right

`<` - Move the pointer left

`+` - Increment the current cell

`-` - Decrement the current cell

`.` - Output the value of the current cell

`,` - Replace the value of the current cell with input

`[` - Jump to the matching `]` instruction if the value of the current cell is zero

`]` - Jump to the matching `[` instruction if the value of the current cell is not zero

**Memory Layout**

The brainfuck tape is made of an infinite (in this case limited to 30,000) collection of 1 byte cells. 
Each cell represents a single, unsigned 8-bit number. 
Cells start initialized at zero.

Since the numbers are unsigned, there is no need for any complex integer implementation. 
If the upper limit of the cell is reached, it wraps back to zero. 
If zero is decremented, it must wrap back to 11111111.

**Notes**

- The `.` operator stores the output in a list which is sent to the channel at the end of execution.

- To prevent the bot hanging, execution time is limited to 30 seconds and will be cancelled if this limit is exceeded.

**Example Usage**

[Image](https://i.imgur.com/jvQkp4N.png)

**Shortcuts**

Tired of writing out characters over and over again?
The bot's unique shortcut system allows you to use special notation to drop chunks of code into your program.
These can be uploaded by anyone and used by anyone. Run `bf!help scripts` to get started with building your own
reusable code snippets.

[Image](https://i.imgur.com/n46Km52.png)

**Bot Commands**

`bf!compile [code]` - Run the brainfuck code given in as the argument

`bf!info` - Show information about brainfuck and its syntax

`bf!invite` - Get an invite link for the bot

`bf!help scripts` - Show available subcommands for script sharing and uploading

`bf!help` - Display available commands to run
