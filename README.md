# Habit Tracker CLI

A simple command-line habit tracker built with Node.js. Add habits, mark them as done, edit or delete them, and view your progress, all from the terminal. Habits are saved in a local JSON file, so no database or external packages are needed.

## Features

- Add, edit, and delete habits
- Mark habits as done
- List all habits or only the ones added today
- View statistics (total, completed, pending, completion rate)
- Data persists in a JSON file

## Project Structure

```
.
├── src/
│   └── app.js          # Main application file
└── data/
    └── habits.json     # Habit storage
```

## Requirements

- [Node.js](https://nodejs.org/) (v14 or later recommended)

No additional dependencies are required.

## How to Run

Make sure Node.js is installed, then navigate to the `src` folder:

```bash
cd src
```

Run the application using:

```bash
node app.js <command>
```

> **Note:** The app reads `../data/habits.json` using a relative path, so always run it from inside the `src` folder.

## Available Commands

### List all habits

```bash
node app.js list
```

Displays all saved habits with their creation date and completion status (✓ done, ✗ not done).

### Add a habit

```bash
node app.js add "Study JavaScript"
```

Adds a new habit to the tracker. The habit gets an auto-generated ID and today's date. Wrap names containing spaces in quotes. Duplicate names are rejected.

### Mark a habit as done

```bash
node app.js done 1
```

Marks the habit with ID `1` as completed.

### Delete a habit

```bash
node app.js delete 1
```

Deletes the habit with ID `1`.

### Edit a habit

```bash
node app.js edit 1 "Study Node.js"
```

Changes the name of the habit with ID `1`.

### Show today's habits

```bash
node app.js today
```

Displays the habits that were added today.

### Show statistics

```bash
node app.js stats
```

Displays:

- Total habits
- Completed habits
- Pending habits
- Completion rate

Example output:

```
Statistics
-----------------
Total habits:4
Completed habits:3
Pending habits:1
Completion rate: 75%
```

### Show help

```bash
node app.js help
```

Displays all available commands.

## Command Summary

| Command | Description |
| --- | --- |
| `list` | List all habits |
| `add <habitName>` | Add a new habit |
| `done <habitId>` | Mark a habit as done |
| `delete <habitId>` | Delete a habit |
| `edit <habitId> <newName>` | Rename a habit |
| `today` | List habits added today |
| `stats` | Show habit statistics |
| `help` | Show available commands |

## Data Storage

Habit data is stored in:

```
data/habits.json
```

The file must exist and contain valid JSON. If you're starting fresh, create it with an empty array:

```json
[]
```

Each habit is stored in this format:

```json
{
  "id": 1,
  "habitName": "Study JavaScript",
  "date": "2026-09-18",
  "done": false
}
```