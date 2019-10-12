<template>
    <div>
    <dl><dt>
        作者信息
        </dt>
        <dd>姓名：{{info.name}}</dd>
            <dd>年龄：{{info.age}}</dd>
                <dd>毕业院校：{{info.university}}</dd>
                  <dd>职业：{{profession}}</dd>
                    <dd>家乡：{{home}}</dd>
        </dl>
    </div>
</template>

<script>
// authorInfo名称可以任意命名
import authorInfo from './export'
import{profession,hometown as home} from './export'
    export default {
        data(){
            return {
               info:authorInfo,
               profession:profession,
               home:home
            }
        },
    }
</script>

<style lang="scss" scoped>
dt{
    text-align: center;
    font-weight: bold;
}
</style>