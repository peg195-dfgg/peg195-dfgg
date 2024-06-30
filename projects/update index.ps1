#这是一个用于生成项目索引的powershell脚本

$output = @()

Get-ChildItem -Directory | ForEach-Object {
    $folderName = $_.Name
    $folderPath = "/projects/$folderName/index.html"
    $folderInfo = @{
        "name" = $folderName
        "path" = $folderPath
    }
    $output += $folderInfo
}

$outputJson = $output | ConvertTo-Json
$outputPath = "..\res\projects.json"
$outputJson | Out-File -FilePath $outputPath

Write-Host "输出已保存到: $outputPath"