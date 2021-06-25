<script>
    import AppStyle from "svelte-doric/core/app-style"
    import baseline from "svelte-doric/core/baseline"
    import theme from "svelte-doric/core/theme/tron"

    import LoadScreen from "./comp/load-screen.svelte"
    import ShareScreen from "./comp/share-screen.svelte"
    import PeerScreen from "./comp/peer-screen.svelte"
    import HostScreen from "./comp/host-screen.svelte"

    import {peerID, host} from "./state"
</script>

<AppStyle {baseline} {theme} />

{#if $peerID === null}
    <LoadScreen />
{:else}
    {#if host === null}
        <HostScreen />
    {:else}
        <PeerScreen />
    {/if}
{/if}
