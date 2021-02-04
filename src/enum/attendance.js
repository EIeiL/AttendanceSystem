// 我的考勤 板块
export const myAttendance = {
  // 表单属性
  formOptions: [
    {
      label: '状态名称',
      prop: 'queryStatus',
      element: 'el-select',
      placeholder: '请选择考勤状态',
      options: []
    }, {
      label: '考勤时间',
      prop: 'queryTime',
      element: 'el-date-picker1',
      format: 'yyyy-MM-dd HH:mm:ss',
      valueFormat: 'yyyy-MM-dd HH:mm:ss'
    }, {
      prop: 'query',
      element: 'el-input',
      maxlength: 20,
      placeholder: '请输入需要搜索的内容'
    }
  ],
  // 工具按钮属性
  btnTools: [
    {
      prop: 'addRecord',
      text: '添加考勤记录'
    }
  ],
  // 表格列属性
  columnOptions: [
    {
      prop: 'userName',
      label: '用户姓名',
      operate: ''
    }, {
      prop: 'signTime',
      label: '考勤时间',
      operate: ''
    }, {
      prop: 'signInStatusName',
      label: '签到状态',
      operate: ''
    }, {
      prop: 'signOutStatusName',
      label: '签退状态',
      operate: ''
    }
  ],
  // 模态框表单属性
  modalOptions: [
    {
      label: '用户姓名',
      prop: 'userId',
      element: 'el-select',
      placeholder: '请选择用户姓名',
      rules: [
        { required: true, message: '请选择用户姓名', trigger: 'blur' }
      ],
      options: [],
      filterable: true
    },
    {
      label: '考勤时间',
      prop: 'signTime',
      element: 'el-date-picker',
      rules: [
        { required: true, message: '请选择考勤时间', trigger: 'blur' }
      ],
      pickerOptions: { // 如何动态选择？
        disabledDate (time) {
          return time.getTime() > Date.now() - 8.64e6// 如果没有后面的-8.64e6就是不可以选择今天的
        }
      },
      format: 'yyyy-MM-dd HH:mm:ss',
      valueFormat: 'yyyy-MM-dd HH:mm:ss'
    }, {
      label: '',
      element: 'el-text',
      placeholder: '注:本次的打卡时间不得早于之前的打卡时间',
      class: 'tipText'
    }
  ]
}
// 用户管理 板块
export const managerUser = {
  formOptions: [
    {
      prop: 'keywords',
      element: 'el-select',
      placeholder: '选择关键词',
      options: [{
        label: '序号',
        value: '1'
      }, {
        label: '用户姓名',
        value: '2'
      }, {
        label: '联系电话',
        value: '3'
      }]
    }, {
      prop: 'content',
      element: 'el-input',
      placeholder: '请输入需要搜索的内容'
    }
  ],
  btnTools: [
    {
      prop: 'addUser',
      text: '添加用户'
    },
    {
      prop: 'importUsers',
      text: '导入用户'
    }
  ],
  columnOptions: [
    {
      prop: 'id',
      label: '序号',
      sortable: true,
      operate: ''
    }, {
      prop: 'username',
      label: '用户姓名',
      operate: ''
    }, {
      prop: 'telephone',
      label: '联系电话',
      operate: ''
    }, {
      prop: 'createTime',
      label: '添加时间',
      sortable: true,
      operate: ''
    },
    {
      label: '操作',
      operate: 'edit,delete'
    }
  ],
  msgOptions: [
    {
      label: '用户姓名',
      prop: 'username',
      element: 'el-input',
      placeholder: '请输入用户姓名',
      rules: [
        { required: true, message: '用户姓名不能为空', trigger: 'blur' },
        { min: 2, max: 5, message: '长度在 2 到 5 个字符' },
        { pattern: /^[\u4E00-\u9FA5]+$/, message: '用户名只能为中文' }
      ]
    }, {
      label: '联系电话',
      prop: 'telephone',
      element: 'el-input',
      placeholder: '请输入联系电话',
      rules: [
        { required: true, message: '联系号码不能为空', trigger: 'blur' },
        {
          validator: function (rule, value, callback) {
            if (/^1[34578]\d{9}$/.test(value) === false) {
              callback(new Error('联系电话只支持数字格式，请修改'))
            } else {
              callback()
            }
          },
          trigger: 'blur'
        }
      ]
    }
  ]
}
// 考勤状态 板块
export const attendanceStatus = {
  formOptions: [{
    label: '状态名称',
    prop: 'name',
    element: 'el-select',
    placeholder: '请选择状态名称',
    options: [{
      label: '签到正常',
      value: '签到正常'
    }, {
      label: '迟到',
      value: '迟到'
    }, {
      label: '早退',
      value: '早退'
    }, {
      label: '迟到转事假',
      value: '迟到转事假'
    }, {
      label: '签退正常',
      value: '签退正常'
    }, {
      label: '缺卡',
      value: '缺卡'
    }]
  }],
  btnTools: [{
    prop: 'addStatus',
    text: '添加状态'
  }],
  columnOptions: [
    {
      prop: 'id',
      label: '序号',
      operate: ''
    }, {
      prop: 'name',
      label: '状态名称',
      operate: ''
    }, {
      prop: 'rule',
      label: '规则设置',
      operate: ''
    }, {
      prop: 'createTime',
      label: '添加时间',
      sortable: true,
      operate: ''
    }, {
      label: '操作',
      operate: 'delete'
    }
  ]
}
// 考勤组管理 -- 板块
export const attendanceGroup = {
  btnTools: [{
    prop: 'addGroup',
    text: '新增考勤组'
  }],
  columnOptions: [
    {
      prop: 'name',
      label: '考勤组名称',
      operate: ''
    }, {
      prop: 'peopleSize',
      label: '考勤人数',
      sortable: true,
      operate: ''
    }, {
      prop: 'typeString',
      label: '类型',
      operate: ''
    }, {
      prop: 'attendanceTime',
      label: '考勤时间',
      sortable: true,
      operate: ''
    }, {
      prop: 'status',
      label: '状态',
      operate: ''
    }, {
      label: '操作',
      operate: 'edit,delete',
      judgeIf: true
    }
  ]
}

// export default {
//   myAttendance: myAttendance,
//   managerUser: managerUser,
//   attendanceStatus: attendanceStatus,
//   attendanceGroup: attendanceGroup
// }
