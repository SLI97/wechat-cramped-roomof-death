export const randomByCount = (n) => {
	let rnd = ''
	for (let i = 0; i < n; i++)
		rnd += Math.floor(Math.random() * 10)
	return rnd
}

export const randomByRange = (start, end) => {
	return Math.floor(Math.random() * (end - start) + start)
}
