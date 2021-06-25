export default (file) => new Promise(
    (resolve) => {
        const reader = new FileReader()
        reader.addEventListener(
            "load",
            () => resolve(reader.result)
        )
        reader.readAsArrayBuffer(file)
    }
)
