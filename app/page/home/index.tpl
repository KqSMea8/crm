{%extends file="../layout.tpl"%}
{%block name="block_title"%}百度金融中台管理系统{%/block%}
{%require name="./index.less"%}
{%block name="main"%}
    <section id="app">
        <router-view></router-view>
    </section>
    {%script%}
        require('./index.js');
    {%/script%}
{%/block%}