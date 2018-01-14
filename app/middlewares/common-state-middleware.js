export default async function commonState(ctx, next) {
    ctx.state.csrf = ctx.csrf;
    await next();
}
