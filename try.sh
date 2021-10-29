DATABASE=$(mongo --quiet --eval "db.getMongo().getDBNames().join('|')")
[[ "$DATABASE" == *"inno-comp"* ]] || echo "Nincs inno-comp!"
[[ "$DATABASE" == *"admin"* ]] || echo "Nincs admin!"
