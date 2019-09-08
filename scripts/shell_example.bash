#!/usr/bin/env bash

export GPIO_DIR="/sys/class/gpio"
export GPIO_EXPORT_FILE="${GPIO_DIR}/export"

RED_PIN="20"
GREEN_PIN="16"
BLUE_PIN="21"

# get pin path
pin_path () {
	echo "${GPIO_DIR}/gpio${1}"
}
export -f pin_path

# pin
export_pin () {
	echo "${1}" > "${GPIO_EXPORT_FILE}"
}
export -f export_pin

# pin file value
write_pin_file () {
	echo "${3}" > "$(pin_path "${1}")/${2}"
}
export -f write_pin_file

# pin direction
pindir () {
	write_pin_file "${1}" "direction" "${2}"
}
export -f pindir

# pin active_low
pinal () {
	write_pin_file "${1}" "active_low" "${2}"
}
export -f pinal

# pin value
pinval () {
	write_pin_file "${1}" "value" "${2}"
}
export -f pinval

# export the gpio pins
export_pin "${RED_PIN}"
export_pin "${GREEN_PIN}"
export_pin "${BLUE_PIN}"

# as output pins
pindir "${RED_PIN}" out
pindir "${GREEN_PIN}" out
pindir "${BLUE_PIN}" out

pinal "${RED_PIN}" 1
pinal "${GREEN_PIN}" 1
pinal "${BLUE_PIN}" 1

pinval "${RED_PIN}" 1
pinval "${GREEN_PIN}" 1
pinval "${BLUE_PIN}" 1
