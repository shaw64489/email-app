function localtunnel {
  lt -s fast-shrimp-78 --port 5000
}
until localtunnel; do
echo "localtunnel server crashed"
sleep 2
done