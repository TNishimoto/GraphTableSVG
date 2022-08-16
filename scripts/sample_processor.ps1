
$sampleFolderDir = $PSScriptRoot + "/../docs/_examples"
$cdnOutputDir = $PSScriptRoot + "/../docs/_cdn_samples"

$cdnScriptPath = "https://cdn.jsdelivr.net/gh/TNishimoto/GraphTableSVG@v0.0.121/dist/graph_table_svg.js"


#function CopySampleHtml($source, $target) {
#	Copy-Item $source $target    
#}
function CopySampleDirectory($sourceRelativeDir, $depth) {
    $sourceDir = $sampleFolderDir + "/" + $sourceRelativeDir
    $targetDir = $cdnOutputDir + "/" + $sourceRelativeDir

    If(-not (Test-Path $targetDir)){
        New-Item $targetDir -ItemType Directory
    }

    $items = Get-ChildItem $sourceDir -File

    foreach ($item in $items) {
        $source = $sourceDir + "/" + $item.Name
        $target = $targetDir + "/" + $item.Name
        
        $contents = Get-Content $source -RAW
        If($depth -eq 1 ){
            $contents = $contents.Replace("../scripts/graph_table_svg.js", $cdnScriptPath)
        }elseif ($depth -eq 2) {
            $contents = $contents.Replace("../../scripts/graph_table_svg.js", $cdnScriptPath)

        }
        Set-Content -Path $target -Value $contents
        
    }
    $dir_items = Get-ChildItem $sourceDir -Directory
    foreach ($dir_item in $dir_items) {
        $nextRelativeSourceDir = $sourceRelativeDir + "/" + $dir_item.Name
        CopySampleDirectory $nextRelativeSourceDir ($depth + 1)        
    }
    
}

CopySampleDirectory "" 1

<#

#>