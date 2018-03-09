# cloud-lamp (WIP)

> The source code for my baby boy's IoT night light cloud lamp.

## Building

**Work in progress...**

Currently looking into various methods of cross compiling. Trying a few docker
images, checking out [`cross`][cross], and also trying to just install the
appropriate toolchain on my machine and doing `cargo build --target=<target>`.

* [`cross`][cross] did not seem to work for me.

## Goals

* Controllable from any device on the same network via HTTP endpoints and a web
		interface.
* Integration with smart home systems including Amazon's Echo.
* Pseudo-random shifting color pattern(s) options for soothing the baby.
* Some kind of integration with music, white noise, or a microphone.
	* Maybe it starts playing rain sounds and softly glowing when the microphone
			is above a certain threshold?


[cross]: https://github.com/japaric/cross
