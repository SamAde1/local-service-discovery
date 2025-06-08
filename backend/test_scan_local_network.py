from app.discovery.mdns_listener import discover_mdns_services

results = discover_mdns_services()
for svc in results:
    print(svc)