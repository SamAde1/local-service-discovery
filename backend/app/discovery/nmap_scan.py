import nmap

def scan_local_network(subnet="192.168.1.0/24", common_ports=[80, 443, 8080, 3000, 5000]):
    scanner = nmap.PortScanner()
    scanner.scan(hosts=subnet, arguments='-p ' + ','.join(map(str, common_ports)) + ' --open')

    results = []
    for host in scanner.all_hosts():
        for proto in scanner[host].all_protocols():
            ports = scanner[host][proto].keys()
            for port in ports:
                results.append({
                    "ip": host,
                    "port": port,
                    "state": scanner[host][proto][port]["state"],
                    "service": scanner[host][proto][port].get("name", "unknown")
                })
    return results