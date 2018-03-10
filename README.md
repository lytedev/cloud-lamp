# cloud-lamp (WIP)

> The source code for my baby boy's IoT night light cloud lamp.

## Setup

My Raspberry Pi is running Arch Linux ARM, so if you're on Raspbian or anything
else, you'll need to install the equivalent packages.

You'll need to install [PiGPIO][https://github.com/joan2937/pigpio] and set it
up to run the daemon on startup. You can put this in
`/etc/systemd/system/pigpiod.service` and run `systemctl daemon-reload &&
systemctl enable pigpiod && systemctl restart pigpiod` to do just that.

```
[Unit]
Description=pigpiod
After=network.target

[Service]
ExecStart=/usr/local/bin/pigpiod
Type=forking
PIDFile=/var/run/pigpio.pid

[Install]
WantedBy=default.target
```

## Goals

* Controllable from any device on the same network via HTTP endpoints and a web
		interface.
* Integration with smart home systems including Amazon's Echo.
* Pseudo-random shifting color pattern(s) options for soothing the baby.
* Some kind of integration with music, white noise, or a microphone.
	* Maybe it starts playing rain sounds and softly glowing when the microphone
			is above a certain threshold?


[cross]: https://github.com/japaric/cross
