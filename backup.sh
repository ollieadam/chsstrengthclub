#!/bin/bash
PROJECT="/home/ollie/chsstrengthclub"
BACKUP_DIR="$PROJECT/backups"
DATE=$(date +%Y-%m-%d)
ZIPFILE="$BACKUP_DIR/chsstrengthclub_backup_$DATE.zip"

mkdir -p "$BACKUP_DIR"

# Create zip, excluding git internals, the backups folder, and editor config
zip -r "$ZIPFILE" "$PROJECT" \
    --exclude "$PROJECT/.git/*" \
    --exclude "$PROJECT/backups/*" \
    --exclude "$PROJECT/.claude/*"

# Keep only the 5 most recent backups (space-safe: read line-by-line, not xargs)
ls -t "$BACKUP_DIR"/chsstrengthclub_backup_*.zip 2>/dev/null | tail -n +6 | while IFS= read -r f; do
    rm -- "$f"
    echo "Deleted old backup: $f"
done

echo "Backup saved: $ZIPFILE"
