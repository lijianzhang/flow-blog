export default async function commonState(ctx, next) {
    ctx.state.csrf = ctx.csrf;
    ctx.state.user = ctx.session.user;
    await next();
}
