export const myAttendance = {
  formOptions: [
    {
      label: '状态名称',
      prop: 'status',
      element: 'el-select',
      placeholder: '请选择考勤状态',

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
    }, {
      label: '考勤时间',
      prop: 'time',
      element: 'el-date-picker'
    }, {
      prop: 'content',
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
      prop: 'name',
      label: '用户姓名',
      operate: '',
    }, {
      prop: 'date',
      label: '考勤时间',
      sortable: true,
      operate: '',
    }, {
      prop: 'address',
      label: '签到状态',
      operate: '',
    }, {
      prop: 'address',
      label: '签退状态',
      operate: ''
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
      prop: 'name',
      label: '序号',
      sortable: true,
      operate: '',
    }, {
      prop: 'name',
      label: '用户姓名',
      operate: '',
    }, {
      prop: 'address',
      label: '联系电话',
      operate: '',
    }, {
      prop: 'date',
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
      prop: 'name',
      label: '序号',
      operate: '',
    }, {
      prop: 'date',
      label: '状态名称',
      operate: '',
    }, {
      prop: 'address',
      label: '规则设置',
      operate: '',
    }, {
      prop: 'date',
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
      prop: 'date',
      label: '考勤人数',
      sortable: true,
      operate: '',
    }, {
      prop: 'name',
      label: '类型',
      operate: '',
    }, {
      prop: 'date',
      label: '考勤时间',
      sortable: true,
      operate: ''
    }, {
      prop: 'address',
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