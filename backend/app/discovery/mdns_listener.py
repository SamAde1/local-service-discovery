from zeroconf import ServiceBrowser, Zeroconf 
import socket
import threading

class MDNSListener:
    def __init__(self):
        self.services = []

    def remove_service(self, zeroconf, type, name):
        print("Service removed:", name)

    def add_service(self, zeroconf, type, name):
        info = zeroconf.get_service_info(type, name)
        if info:
            address = socket.inet_ntoa(info.addresses[0])
            self.services.append({
                "name": name,
                "ip": address,
                "port": info.port,
                "properties": info.properties,
                "type": type,
            })
            
    def update_service(self, zeroconf, type, name):
        # You can choose to update your service cache here if needed
        pass  # Optional logic for service changes
            
def discover_mdns_services(timeout=20):
    zeroconf = Zeroconf()
    listener = MDNSListener()
    ServiceBrowser(zeroconf, "_http._tcp.local.", listener)

    threading.Event().wait(timeout)
    zeroconf.close()
    return listener.services
