<script>
    import Spinner from "svelte-doric/core/circle-spinner"

    import FileList from "./file-list.svelte"
    import FileSelect from "./file-select.svelte"
    import Panel from "./panel.svelte"

    import {peer, host} from "../state"

    let fileList = null
    const actions = {
        greet: (data) => {
            hostName = data.hostName
            name = data.peerName
        },
        file: (data) => fileList.append(data),
    }

    let connected = false
    let hostName = null
    let name = null
    let statusCheck = null
    const conn = peer.connect(host)
    const peerMessage = (message) => {
        console.log(message)
        const {type, data} = message
        actions[type]?.(data)
    }

    const disconnect = () => {
        conn.close()
    }

    const sendFile = (evt) => conn.send({
        type: "file",
        data: evt.detail
    })

    conn.on(
        "open",
        () => {
            connected = true
            statusCheck = setInterval(
                () => {
                    console.log(conn.open)
                    if (conn.open === true) {
                        return
                    }
                    hostName = null
                    connected = false
                    clearInterval(statusCheck)
                },
                1000
            )
        }
    )
    conn.on("data", peerMessage)
    // conn.on("error", (err) => console.error(err))
</script>

<style>
    app-layout {
        display: grid;
        max-width: 640px;
        margin: auto;
    }

    div {
        display: flex;
        align-items: center;
    }
</style>

<svelte:window on:beforeunload={disconnect} />

<app-layout>
    <Panel title="You">
        {#if name}
            {#if connected === false}
                Disconnected from host
            {:else}
                {name}
            {/if}
        {:else}
            <div>
                <Spinner size={32} />
                Starting session
            </div>
        {/if}
    </Panel>

    <Panel title="Host">
        {#if hostName === null}
            Not connected
        {:else}
            <div>{hostName}</div>
            <FileSelect on:file-select={sendFile} />
        {/if}
    </Panel>

    <FileList bind:this={fileList} />
</app-layout>
