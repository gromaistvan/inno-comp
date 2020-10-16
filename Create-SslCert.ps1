param ($domain)
$short = ($domain -split '\.')[0]
$password = ConvertTo-SecureString -String 'bubuka' -Force -AsPlainText
$3years = (Get-Date).AddYears(3)
$certificate = New-SelfSignedCertificate -FriendlyName $short -DnsName $domain, $short -NotAfter $3years -KeyExportPolicy Exportable -CertStoreLocation cert:\LocalMachine\My
$thumbprint = $certificate.Thumbprint
Get-ChildItem -Path cert:\LocalMachine\My\$thumbprint | Export-PfxCertificate -FilePath "$short.pfx" -Password $password
