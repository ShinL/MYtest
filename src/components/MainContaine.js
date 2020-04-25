import React, {Component} from 'react';
import '../style/MainContaine.scss';
import axios from 'axios';
import { Table, Tag, Button, Modal, Input } from 'antd';

const columns = (openModal, filteredValue) => ([
	{
		title: '名字',
		key: 'name',
		fixed: 'left',
		dataIndex: 'name',
	},
	{
		title: '描述',
		dataIndex: 'description',
		key: 'description',
		render: text => <div className="description" title={text}>{text}</div>
	},
	{
		title: '图片',
		dataIndex: 'image',
		key: 'image',
		render: (text) => <img src={text}></img>
	},
	{
		title: '链接',
		dataIndex: 'baseURL',
		key: 'baseURL',
		render: text => <a target="_blank" href={text}>链接</a>
	},
	{
		title: '标签',
		dataIndex: 'tags',
		key: 'tags',
		filteredValue,
		onFilter: (value, record) => {
			let isSelect = false;
			for(let a = 0; a < record.tags.length; a++) {
				if (record.tags[a].indexOf(value) !== -1) {
					return isSelect = true
				}
			}
			return isSelect;
		},
		render: text => (<div>
				{
					text.map(item => <Tag key={item}>{item}</Tag>)
				}
			</div>)
	},
	{
		title: '属性',
		dataIndex: 'properties',
		key: 'properties',
		fixed: 'right',
		render: (text) => <Button type="primary" onClick={() => { openModal(text); }}>查看</Button>
	},
]);

const proColumns = [
	{
		title: 'type',
		dataIndex: 'type',
		key: 'type',
	},
	{
		title: 'url',
		dataIndex: 'url',
		key: 'url',
		render: text => <a target="_blank" href={text}>{text}</a>
	},
]

export default class MainContaine extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			loading: true,
			proData: [],
			modalVisible: false,
			filteredValue: '',
		};
	}

	componentDidMount() {
		axios.get('//www.mocky.io/v2/5ea28891310000358f1ef182').then(({ data: { apis } }) => {
			this.setState({ data: apis, loading: false });
		}).catch((error) => {
			console.log(error);
		});
	}

	openModal = (record) => {
		console.log(record);
		this.setState({modalVisible: true, proData: record});
	}
	
	handleCancel = () => {
		this.setState({modalVisible: false});
	}

	handleChange = (e) => {
		const { value } = e.target
		this.setState({ filteredValue: value ? [value]: [] });
	}

	render() {
		const { data, loading, modalVisible, proData, filteredValue } = this.state;
		return (
			<div className="main-containe">
				<div className="top"></div>
				<div className="left"></div>
				<div className="content">
					<Input placeholder="请输入筛选条件" onChange={this.handleChange}></Input>
					<Table
						scroll={{x: true}}
						columns={columns(this.openModal, filteredValue)}
						dataSource={data}
						loading={loading}
						pagination={{ pageSize: 3 }}
					/>
				</div>
				<Modal
					visible={modalVisible}
					okText="确认"
					cancelText="关闭"
					onCancel={this.handleCancel}
					onOk={this.handleCancel}
					title="属性"
				>
					<Table
						columns={proColumns}
						dataSource={proData}
						loading={loading}
						tableLayout="fixed"
						pagination={false}
					/>
				</Modal>
			</div>
		)
	}
}
//3题答案
// const titleList = ["标题1", "标题2", "标题3"];
// const colums = titleList.map((item, index) => ({
// 	title: item,
// 	key: index,
// 	reder: text => <a href={`http://hello.com/${index}`}>{text[index]}</a>
// }))