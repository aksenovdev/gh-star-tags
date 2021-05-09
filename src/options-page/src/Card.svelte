<style lang="scss">
    .card {
        display: inline-flex;
        flex-direction: column;
        align-items: stretch;
        margin: 10px;
        width: 300px;
        height: 220px;
        border-radius: 4px;
        box-shadow: 0 4px 5px 0 rgb(0 0 0 / 14%), 0 1px 10px 0 rgb(0 0 0 / 12%), 0 2px 4px -1px rgb(0 0 0 / 30%);
    }

    .content {
        flex-grow: 1;
        margin: 10px;
        padding: 10px;
        border-radius: 4px;
        box-shadow: inset 0px 2px 6px 4px rgb(0 0 0 / 14%);
    }

    .footer {
        padding: 0 10px 10px 10px;
        display: flex;
        align-items: center;
    }

    .spacer {
        flex-grow: 1;
    }
</style>

<div class="card">
    <div class="content">
        <slot></slot>
    </div>
    <div class="footer">
        <slot name="actions"></slot>
        <div class="spacer"></div>
        <slot name="actions-end"></slot>
    </div>
</div>
