function setValue (key, value) {
	localStorage.setItem(key, JSON.stringify(value))
}

function getValue (key) {
	const itemStr = localStorage.getItem(key)

	if (!itemStr) return null

	const item = JSON.parse(itemStr)

	return item
}

function removeValue (key) {
	const itemStr = localStorage.getItem(key)

	if (!itemStr) return null

	localStorage.removeItem(key)

	return 'REMOVED'
}

function setValueWithExpiry (key, value, time) {
	const now = new Date()

	const item = {
		value,
		expiry: now.getTime() + time,
	}

	localStorage.setItem(key, JSON.stringify(item))
}

function getValueWithExpiry (key) {
	const itemStr = localStorage.getItem(key)

	if (!itemStr) return null

	const item = JSON.parse(itemStr)

	const now = new Date()

	if (now.getTime() > item.expiry) {
		localStorage.removeItem(key)

		return null
	}

	return item
}

export {
	setValue,
	getValue,
	removeValue,
	setValueWithExpiry,
	getValueWithExpiry,
}
