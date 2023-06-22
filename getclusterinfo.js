// JavaScript Document


clusterList = { 'MY' :
	{
			"kind": "Config",
			"apiVersion": "v1",
			"preferences": {},
			"clusters": [
				{
					"name": "kubernetes",
					"cluster": {
						"server": "https://192.168.79.245:6443",
						"certificate-authority-data": "LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUN5RENDQWJDZ0F3SUJBZ0lCQURBTkJna3Foa2lHOXcwQkFRc0ZBREFWTVJNd0VRWURWUVFERXdwcmRXSmwKY201bGRHVnpNQjRYRFRJeU1ESXhNakE0TWpjME5Wb1hEVE15TURJeE1EQTRNamMwTlZvd0ZURVRNQkVHQTFVRQpBeE1LYTNWaVpYSnVaWFJsY3pDQ0FTSXdEUVlKS29aSWh2Y05BUUVCQlFBRGdnRVBBRENDQVFvQ2dnRUJBTU9DCk81a01uRi9DeldJRUVnTDEyRG5LRllKeHhJQURDQjY0TUQ3eXVWYUUvY1N1OHU2ekVWSnBKM2hTWkgva1ArUDEKN1ZhS3Mvczh4S3dNQ1BIRGZwbEVYYXkybkQ1d05JbDBCZkpPbXVRWW5wZkNjNThEVDFzMzlXek1taDJ6b2FDVgpOTUFDS3AvL29iUmd3Mm93L25DU2dmamVvY2xBemVnaitoNzZJdy9wa0t4NmVKY1JNTXpxWVA1UnlQZWwweEtKCkVuVksvMGRtc3pRVmNLemtOZ05LRFBJSmFMcFU5bTUza1ZlL0J3U0E1akYzSGk4VkpjYmRtSlkrbHorZmM3ZW0KSjlKRE5VbitBdmFsNzgrc1ViMWZSYmdMWCs3cEtNVGlrWi9DNHFqR1lmN01aaXVLR04wdmFJazdlU1F2NWVhegp0UmcwQVo2QUZFaWNZRHV6WXdVQ0F3RUFBYU1qTUNFd0RnWURWUjBQQVFIL0JBUURBZ0trTUE4R0ExVWRFd0VCCi93UUZNQU1CQWY4d0RRWUpLb1pJaHZjTkFRRUxCUUFEZ2dFQkFDOFk0Z1R2di9nQ3Rvd3hMTk83MmQydE5RTzMKcDMzMGdPY3lDeHo5dmVKdFJsUjFnQm9NbVVnQVdHMnVhWjFBZVVRK0VMSTBRT2tqZ3grV1dwV21uVXlPV1Y2dgpxS3BNaDZlVjVEWitNZWQyZ2lmM2VseFJvNWdNdzFYQU1Sc0FzNGVQVCtuNkVlWnZaTVlyWXh0UGFXNHpleVBMCkFDQ0s5Ym5DVnNaSTJKcHVjRVA1c0N3UktJNUVsTnZkVmt3TmJjV0krbEY5SWgwZFM5WVZGZk9sV0FBYmlGYXkKQ24zZnhKU0FvaFFtNU1BM0VOMWw5eGRHenRqV3I3cmloNUdRaVlScHR5Sm1CcXJJSHNMZm9vYlMweDMvS1FOZgpKSlovR2xSNktVaE55emkyL0JCK29pUDkwaDRMZGNBLzgzMnplaXo4d0xpakt3TTVVU0R0cjYwOGxMVT0KLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo="
					}
				}
			],
			"users": [
				{
					"name": "kubernetes-admin",
					"user": {
						"client-certificate-data": "LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUM4akNDQWRxZ0F3SUJBZ0lJYzFsZWNEeEF2VjR3RFFZSktvWklodmNOQVFFTEJRQXdGVEVUTUJFR0ExVUUKQXhNS2EzVmlaWEp1WlhSbGN6QWVGdzB5TWpBeU1USXdPREkzTkRWYUZ3MHlOREF6TURNd05URTVOVEJhTURReApGekFWQmdOVkJBb1REbk41YzNSbGJUcHRZWE4wWlhKek1Sa3dGd1lEVlFRREV4QnJkV0psY201bGRHVnpMV0ZrCmJXbHVNSUlCSWpBTkJna3Foa2lHOXcwQkFRRUZBQU9DQVE4QU1JSUJDZ0tDQVFFQTBJa2l6WXV0TldrNE1GSVEKQ096UkVRYXZDV3FuWU94VE1JeDZCMi9CdDRIWXpQZG1TdlcxQi9TdFhlSnZFT1NDcFI4SDNVbUl3Zy8ycWsvTAp1MmJBQkt6K2h0TVpudENGdDVDMzI4WjhCcXlhWS85TUxHekRsZE5HR1h2ajRjdTdLdnY5b0pFakR6SThhU2VxCmU3VjVGVTNnOWJleVNDTFIwcHpkWUhBbWRpbjlOVEtjU0thdlVzYkRUbXRXa2hsb0cyL05Wdm5YT3I1WUVCOFkKK2pWWU5tLzFMY051VmpRZ0VVdXNMU21WVmtoUjlORFZsczlaMGZWL3JEZUtOVmt0VDdTOFhUWmdGU3BQVHJjegp0L1RwY3IxSVFyUVNnY1JGc1RtYVRHQnhVUXdSLzlJZnNqdmc2M3NUUGIrRU95T0pzSnNza3hTL0k0MU91d1FGCi9sN0R1UUlEQVFBQm95Y3dKVEFPQmdOVkhROEJBZjhFQkFNQ0JhQXdFd1lEVlIwbEJBd3dDZ1lJS3dZQkJRVUgKQXdJd0RRWUpLb1pJaHZjTkFRRUxCUUFEZ2dFQkFCTzUwMjIwRlhrOEFsUHdjdjVPb0IrSnBRUFg5TWJidEduQwp1VFlwVkNBTW8ybi80M2hKMGxpRHdYSTU5TDBoa0ViMU42eSsrWU5ESzIycndtZXkvQjBTMkxBSUQyK3BlZW9TClJMaVZmSHFaWmVyYmU1YUl3RGdNejI0Sll4eUJTdUp6eWZzMUdJTmZoblNvSk9sOEVpWXo0SGJlWityZ252OEgKTHpBZDFtYTZMU2x4aEZKdEVjMjkyaTVyZ1FjRC91Z0JpT3ZzRDJhaWlMVkFUaTVDRVRSR3orRTEwWU1nT3ZMcAp2aERzbXB1Q0NEcjRqNUZ1UG9KMlpZQ2Y2dm1NVkZLQkkwWFB3Z2UvQThSZlpOOWVreG85TE5iZkhDdEpNbHIxCllady8rc2ZDbW1NeFU0Rmx6NUhzeWQ5QjFkOWE5RGZBTC83TENBVUhkRkpEWmZuQ1F4VT0KLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=",
						"client-key-data": "LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlFcEFJQkFBS0NBUUVBMElraXpZdXROV2s0TUZJUUNPelJFUWF2Q1dxbllPeFRNSXg2QjIvQnQ0SFl6UGRtClN2VzFCL1N0WGVKdkVPU0NwUjhIM1VtSXdnLzJxay9MdTJiQUJLeitodE1abnRDRnQ1QzMyOFo4QnF5YVkvOU0KTEd6RGxkTkdHWHZqNGN1N0t2djlvSkVqRHpJOGFTZXFlN1Y1RlUzZzliZXlTQ0xSMHB6ZFlIQW1kaW45TlRLYwpTS2F2VXNiRFRtdFdraGxvRzIvTlZ2blhPcjVZRUI4WStqVllObS8xTGNOdVZqUWdFVXVzTFNtVlZraFI5TkRWCmxzOVowZlYvckRlS05Wa3RUN1M4WFRaZ0ZTcFBUcmN6dC9UcGNyMUlRclFTZ2NSRnNUbWFUR0J4VVF3Ui85SWYKc2p2ZzYzc1RQYitFT3lPSnNKc3NreFMvSTQxT3V3UUYvbDdEdVFJREFRQUJBb0lCQVFDUzl3TFREMHdicHpMVgpReEJQNmU0UmJMOXhDSHc3bjNHbGRtc04wS0lhWE9WWTFrWitMNW5NcUpDQjZQSFRXdWdEek5HekQzN1ZIWUQrCldFeEJuMUZXT2tFSzdiMVJvcTJLUi9CN2IrKzZtR3dhYXpMWTRESWE1aEd5SmhEYzhjTFBzVlgya2pLK0krNVYKUVlJeHV4eEJlbWcvWTUyK251TjI1ZHhTZWRkeFVES0tWVTBrU3l4bVk5TnhhSHYxOUFTR1NKbVVNYTNQRWY4ZgpuTkkrK1RCbEljRWJFQldjYWhGOVdHc1ZkYnN3VFlHUzBXbjhIdlZrUkp1U09KQkNyYzBjS3RBU3dQOXY1d3NPCllGbmRFRmlPTklXd3BFQVQ0a003Z0NKT1duZGJzUnV1bFZiM1pCUzBGZ0M3MWV1eGwwRm4rejRtTndaRjBEOHcKR2RET0ZObUJBb0dCQU91V2syZ20rSGo2d2xzQ292SEtSbzBVSUF5MU96Uzk0UDVTZXRlaTZ0MkhINHQ0VjNBRwpZemZVdlNjcmx6SFIrV2I2VlhORmJUeExmUXkvcFZ5ZjBJRXBXa0dHazE2TTY4SGRVS1h3RjIrdStvOUV3REJWCnNPTy8ydXNOL3ZsNnV5dnQvVWRNc01mMDU3NW1ld1lMcHlGUXUyNUJBa1RpbGI2WHlNb3FRVTNSQW9HQkFPS2EKaHRkRmk2VHRxRW4xcVRQejN4b3VKSlROS0xvc1RCa041UHZHbjl0UjI2cUE4VkduaFF6dXNDT2NXakx0OFVUMAo0N1E2ODh2aXhHM1BKT2EvVERQemlkem9WWXBVN3R3cDFNa1JpdnI5UldjeE1JaDVZaGxpaHZ5S0RQejBlSjc5CjhiUDR2QkVOaDRiSUNGb1NjcmdYK0g4UW40bERwd0Z4M3ZoL0lZbHBBb0dBY1A4MkVMeXdiUWFKZGpHYmlqR2wKQ1VIZjVYaC92MXBic21CSlAyaUxFbG9mVFR3WlpFZ01DdGxsS0lhRjdJVjBCR3FKMWRJMUJMaUljRGJ6ejZ0dgp6S1BUQUo3VnpJSDNDbk5tblZDOVRQbzJmOFZRRVY3b2l6U1lnaW1pWkhMemw2eDgwVmY5YXNzUzVJWXU5OFZiCkVtV3dvTDlab1VTMDRrZlhMUEI3aGlFQ2dZRUFob1VIVVJvVzZRU3daNTl2SDhsQkF6Q3JSSzU1NC9OU0JYbUwKR3EveHkrZlBTR3VkVmtUbEppVTM2UnZ6SzlLMjdLR1gzekV6OHpBZVBiVy9pVCs4eEFacUsvcThkUTh3Y1FCZwpNakM0MllDcXg3U2F4Qm1TMDlENm8wWnNxV21UaFlicENsYTVoa0lLMTBjK05nSkhtZU9aQUExbE43NHlrUmdCCkxuR0IvaWtDZ1lBM3hjNklnbnpvQmZwUmp1VExXbUV1SU1WS3FOVmNkNEIralhNWGNFd0gvcGY5Y2MwOWl5RTMKYmYvVisreEpEd0szVWFmTjJOaytQSGJtOEZzd3Zxc2RLVUNtcHhsSUNmVjljUkxTN1ZEVGkrc1laSzB4bGRYRgpVVFdDeVJJS2FyS1kxbWk1eVVmZlVPaWRjSE11bEVGVWdyNGlWS2Uxanh5TE9idzkwZFdaWmc9PQotLS0tLUVORCBSU0EgUFJJVkFURSBLRVktLS0tLQo="
					}
				}
			],
			"contexts": [
				{
					"name": "kubernetes-admin@kubernetes",
					"context": {
						"cluster": "kubernetes",
						"user": "kubernetes-admin"
					}
				}
			],
			"current-context": "kubernetes-admin@kubernetes"
	}
};



kubernetesCluster = (cluster) => {
	return clusterList[cluster];

} 

exports.getClusterInfo = kubernetesCluster;