<template>
	<Layout>
        <Sider hide-trigger :style="{background: '#fff'}">
            <Menu :active-name="aname" theme="light" width="auto" @on-select="selectHandler">
                <MenuItem name="carlist">大表选车</MenuItem>
                <MenuItem name="kanming">看命选车</MenuItem>
            </Menu>
        </Sider>
        <Layout :style="{padding: '0 24px 24px'}">
            <Breadcrumb :style="{margin: '24px 0'}">
                <BreadcrumbItem>Home</BreadcrumbItem>
                <BreadcrumbItem>Components</BreadcrumbItem>
                <BreadcrumbItem>Layout</BreadcrumbItem>
            </Breadcrumb>
            <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                <router-view></router-view>
            </Content>
        </Layout>
    </Layout>
</template>

<script type="text/javascript">
    export default {
        methods : {
            selectHandler(name){
                this.$router.push({"name" : name});
            }
        },
        computed : {
            aname(){
                if(this.$router.history.current.fullPath.indexOf("/carlist") != -1){
                    return "carlist";
                }else if(this.$router.history.current.fullPath.indexOf("/kanming") != -1){
                    return "kanming"
                }
            }
        }
    }
</script>