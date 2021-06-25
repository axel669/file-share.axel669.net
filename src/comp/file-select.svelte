<script>
    import {createEventDispatcher} from "svelte"
    import Button from "svelte-doric/core/button"

    import readFile from "../read-file"

    const dispatch = createEventDispatcher()

    let fileInput = null
    const chooseFile = () => {
        fileInput.click()
    }
    const sendFile = async (evt) => {
        const [file] = fileInput.files

        dispatch(
            "file-select",
            {
                name: file.name,
                content: await readFile(file)
            }
        )

        fileInput.value = ""
    }
</script>

<style>
    input {
        display: none;
    }
</style>

<Button on:tap={chooseFile} variant="outline" color="primary">
    <input type="file" bind:this={fileInput} on:change={sendFile} />
    Send File
</Button>
