<script>
    export let title = ""
</script>

<style>
    fieldset {
        border: 3px solid var(--primary);
        border-radius: 4px;
    }
</style>

<fieldset>
    <legend>{title}</legend>
    <slot />
</fieldset>
