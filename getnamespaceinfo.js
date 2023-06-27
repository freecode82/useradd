// JavaScript Document
namespaceList = { 'MY' : ['default', 'kube-system']};

kubernetesNamespace = (namespace) => {
	return namespaceList[namespace];
}

exports.getnamespaceInfo = kubernetesNamespace;