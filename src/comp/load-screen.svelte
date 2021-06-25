<script>
    import Spinner from "svelte-doric/core/hexagon-spinner"
</script>

<style>
    spinner-container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>

<spinner-container>
    <Spinner size={200} />
</spinner-container>
