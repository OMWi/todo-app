import os
import socket
import json
import datetime
import enum
import threading

def main():
    try:
        port = int(input("Enter port: "))
    except Exception:
        print("Input error")
        return
    name = input("Enter name: ")
    try:
        target_port = int(input("Enter target port: "))
    except Exception:
        print("Input error")
        return
    client = Client(port, name, "127.0.0.1", target_port)
    listen_thread = threading.Thread(target=client.listen)
    connect_thread = threading.Thread(target=client.connect)
    listen_thread.start()
    connect_thread.start()  

class Client:
    def __init__(self, port, name, host, target_port) -> None:
        self.host = host
        self.target_port = target_port
        self.socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        self.socket.bind((host, port))
        self.connection = None
        self.name = name
        self.messages = []     
        self.noresponse_messages = []
        self.update_chat()

    def clear_console(self):
        os.system('cls' if os.name == 'nt' else 'clear')   

    def update_chat(self):
        self.clear_console()
        for message in sorted(self.messages, key=lambda msg: msg['time']):
            if message in self.noresponse_messages:
                print(f"{message['name']} !*! > {message['text']}")
                continue
            print(f"{message['name']} > {message['text']}")

    def listen(self):
        while True:
            data, addr = self.socket.recvfrom(1024)
            if self.connection is None:
                self.connection = addr
            if self.connection == addr:
                msg = json.loads(data.decode('utf-8'))
                if msg['type'] == MessageType.SENT.value:
                    self.messages.append(msg)
                    self.update_chat()
                    new_msg = Message("", "", msg['time'], MessageType.RECEIVED.value)
                    self.socket.sendto(str(new_msg).encode('utf-8'), self.connection)
                elif msg['type'] == MessageType.RECEIVED.value:
                    for index, elem in enumerate(self.noresponse_messages):
                        if elem['time'] == msg['time']:
                            self.noresponse_messages.pop(index)
                            self.update_chat()
                            break

    def connect(self):
        while True:
            text = input("")
            message = Message(self.name, text, datetime.datetime.utcnow().timestamp())
            self.socket.sendto(str(message).encode('utf-8'), (self.host, self.target_port))
            self.messages.append(json.loads(str(message)))
            self.noresponse_messages.append(json.loads(str(message)))            
            self.update_chat()


class MessageType(enum.Enum):
    SENT = 1
    RECEIVED = 2

class Message:
    def __init__(self, name, text, time, type=MessageType.SENT.value) -> None:
        self.name = name
        self.text = text
        self.time = time
        self.type = type

    def __str__(self) -> str:
        return json.dumps({'name':self.name, 'text':self.text, 
            'time':self.time, 'type':self.type})


if __name__ == '__main__':
    main()
      