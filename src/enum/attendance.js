export const myAttendance = {
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
      element: 'el-date-picker1'
    }, {
      prop: 'query',
      element: 'el-input',
      maxlength: 20,
      placeholder: '请输入需要搜索的内容'
    }
  ],
  btnTools: [
    {
      prop: 'addRecord',
      text: '添加考勤记录'
    }
  ],
  columnOptions: [
    {
      prop: 'userName',
      label: '用户姓名',
      operate: '',
    }, {
      prop: 'signTime',
      label: '考勤时间',
      operate: '',
    }, {
      prop: 'signInStatusName',
      label: '签到状态',
      operate: '',
    }, {
      prop: 'signOutStatusName',
      label: '签退状态',
      operate: ''
    }
  ],
  modalOptions: [
    {
      label: "用户姓名",
      prop: "userId",
      element: "el-select",
      placeholder: "请选择用户姓名",
      rules: [
        { required: true, message: "请选择用户姓名", trigger: "blur" },
      ],
      options: [
      ],
    },
    {
      label: "考勤时间",
      prop: "signTime",
      element: "el-date-picker",
      rules: [
        { required: true, message: "请选择考勤时间", trigger: "blur" },
      ],
      value: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
    }, {
      label: "",
      element: "el-text",
      placeholder: "注:本次的打卡时间不得早于之前的打卡时间",
      class: "tipText"
    }
  ]
}

export const managerUser = {
  formOptions: [
    {
      prop: 'keywords',
      element: 'el-select',
      placeholder: '选择关键词',
      options: [{
        label: '序号',
        value: '序号'
      }, {
        label: '用户姓名',
        value: '用户姓名'
      }, {
        label: '联系电话',
        value: '联系电话'
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
      operate: '',
    }, {
      prop: 'username',
      label: '用户姓名',
      operate: '',
    }, {
      prop: 'telephone',
      label: '联系电话',
      operate: '',
    }, {
      prop: 'createTime',
      label: '添加时间',
      sortable: true,
      operate: '',
    },
    {
      label: '操作',
      operate: 'edit,delete'
    }
  ]
}

export const attendanceStatus = {
  formOptions: [{
    label: '状态名称',
    prop: 'status',
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
      operate: '',
    }, {
      prop: 'name',
      label: '状态名称',
      operate: '',
    }, {
      prop: 'rule',
      label: '规则设置',
      operate: '',
    }, {
      prop: 'createTime',
      label: '添加时间',
      sortable: true,
      operate: ''
    }, {
      label: '操作',
      operate: 'delete',
    }
  ]
}

export const attendanceGroup = {
  btnTools: [{
    prop: 'addGroup',
    text: '新增考勤组'
  }],
  columnOptions: [
    {
      prop: 'name',
      label: '考勤组名称',
      operate: '',
    }, {
      prop: 'peopleSize',
      label: '考勤人数',
      sortable: true,
      operate: '',
    }, {
      prop: 'type',
      label: '类型',
      operate: '',
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