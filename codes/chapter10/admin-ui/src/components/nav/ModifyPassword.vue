<template>
  <div>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
      <el-row :gutter="0">
        <el-col :span="23">
          <el-form-item label="原始密码" prop="oldPwd">
            <pwd-btn v-model.trim="ruleForm.oldPwd" placeholder="原始密码"></pwd-btn>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="0">
        <el-col :span="23">
          <el-form-item label="新密码" prop="password">
            <pwd-btn v-model.trim="ruleForm.password" placeholder="新密码"></pwd-btn>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="0">
        <el-col :span="23">
          <el-form-item label="新密码确认" prop="checkPass">
            <pwd-btn v-model.trim="ruleForm.checkPass" placeholder="新密码确认"></pwd-btn>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <div style="display: inline-block">
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
        <el-button @click="isHide">取 消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { changePwd } from '../../services/user-service';
import PwdBtn from '../form/PwdBtn'
import { validatePwd, validatePwdCheck } from '@/utils/validate-utils.js'
export default {
  name: 'modify-password',
  props: ['info'],
  components: {
    PwdBtn
  },
  data () {
    return {
      visible: true,
      id: this.info.id,
      ruleForm: {
        oldPwd: '',
        password: '',
        checkPass: ''
      },
      rules: {
        oldPwd: [
          { required: true, message: '请输入原始密码', trigger: 'blur' }
        ],
        password: [
          { validator: validatePwd, trigger: 'blur' },
          this.$baseConfig.validate.pwd
        ],
        checkPass: [
          { validator: (rule, value, callback) => { return validatePwdCheck(rule, value, callback, this.ruleForm.password) }, trigger: 'blur' },
          this.$baseConfig.validate.pwd
        ]
      }
    };
  },
  watch: {
    info: {
      handler (newData, oldData) {
        this.id = newData.id;
      },
      deep: true
    }
  },
  created () {
    this.ruleForm = {
      oldPwd: '',
      password: '',
      checkPass: ''
    };
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log('验证成功')
          changePwd(
            {
              id: this.id,
              password: this.ruleForm.oldPwd, //旧密码
              newPassword: this.ruleForm.password //新密码
            })
            .then(res => {
              if (res.code === 200) {
                this.$message({
                  message: '密码修改成功',
                  type: 'success'
                });
                this.isHide();
              }
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    isHide () {
      this.$refs['ruleForm'].resetFields();
      this.$emit('isHideModifyPwd', false);
    }
  }
};
</script>

