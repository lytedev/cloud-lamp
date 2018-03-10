# cloud-lamp (WIP)

> The source code for my baby boy's IoT night light cloud lamp.

## Setup

My Raspberry Pi is running Arch Linux ARM, so if you're on Raspbian or anything
else, you'll need to install the equivalent packages.

```sh
pacman -S nodejs yarn python python2
yarn
yarn start # since this manipulates GPIO pins, it must be run as root
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
