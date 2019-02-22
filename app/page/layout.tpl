<!DOCTYPE html>
{%html lang="zh" framework="../static/lib/mod.js"%}
    {%head%}
        <meta charset="utf-8">
        <meta name="format-detection" content="telephone=no, email=no, address=none">
        <meta http-equiv="Expires" content="-1">
        <meta http-equiv="Pragma" content="no-cache">
        <meta http-equiv="Cache-Control" content="no-cache">
        <link rel="icon" href="favicon.ico" />
        <title>{%block name="block_title"%}CRM{%/block%}</title>
        <script type="text/javascript">
            __inline('../static/track/hmt.js');
            __inline('../static/track/bfbstatic.js');
            __inline('../static/track/dp-init.js');
        </script>
        {%block name="block_head_static"%}{%/block%}
        {%require name="../static/reset.css"%}
        {%require name="../static/common.less"%}
        {%require name="fontAwesome"%}
        <script>
        (function () {
            window.G = {
                constants: {
                     token: '{%$data.csrfToken%}',
                     isLogin: '{%$isLogin%}' === '1',
                     ucId: '{%$ucId%}'
                }
            };
        })();
        </script>
    {%/head%}
    <script> alog('speed.set', 'ht', +new Date); </script>
    {%body%}
        <div class="body" id="body">
            {%block name="main"%}
            {%/block%}
        </div>
        {%*首屏时间统计*%}
        <script type="text/javascript">
            __inline('../static/track/dp-first-screen.js');
            __inline('../static/track/dp-base.js');
        </script>
    {%/body%}
    {%*非首屏时间统计*%}
    <script type="text/javascript">
        alog('speed.set', 'drt', +new Date);
    </script>
{%/html%}
