<script>
    import Panel from "./panel.svelte"

    let files = []

    export const append = (fileInfo) => {
        const {content, name} = fileInfo
        const blob = new Blob([content])
        const url = URL.createObjectURL(blob)
        const id = `${name}-${Date.now()}`

        files = [
            ...files,
            {name, url, id}
        ]
    }
</script>

<style>
    a, a:hover, a:visited, a:active {
        color: var(--text-normal);
    }
</style>

<Panel title="Recieved Files">
    {#each files as {name, url, id} (id)}
        <div>
            <a href={url} download={name}>
                Download {name}
            </a>
        </div>
    {/each}
</Panel>
