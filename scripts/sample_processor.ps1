
$sampleFolderDir = $PSScriptRoot + "/../docs/examples"
$cdnOutputDir = $PSScriptRoot + "/../docs/_cdn_examples"
$debugOutputDir = $PSScriptRoot + "/../docs/_debug_examples"

$cdnScriptPath = "https://cdn.jsdelivr.net/npm/graph-table-svg@0.0.127/dist/graph_table_svg.js"


function CopySampleHtml($source, $target, $depth, $isCDN) {
    $contents = Get-Content $source -RAW
    $msg1 = "/* This comment is a landmark for data processing. */"
    If($isCDN){
        If($depth -eq 1 ){
            $contents = $contents.Replace("../scripts/graph_table_svg.js", $cdnScriptPath)
        }elseif ($depth -eq 2) {
            $contents = $contents.Replace("../../scripts/graph_table_svg.js", $cdnScriptPath)
        }
        $contents = $contents.Replace($msg1, "")
        Set-Content -Path $target -Value $contents

    }else{
        $msg2 = 'id="main"'

        $code = 'GraphTableSVG.HTML.CSS.writeDownCSSToStyleAttributes("main");'
        $landmark1 = $contents.IndexOf($msg1)
        $landmark2 = $contents.IndexOf($msg2)

        If($landmark1 -ne -1 -And $landmark2 -ne -1){
            $contents = $contents.Replace($msg1, $code)
            Set-Content -Path $target -Value $contents
            $target        
        }
    }
}
function CopySampleDirectory($sourceRelativeDir, $targetBaseDir , $depth, $isCDN) {
    $sourceDir = $sampleFolderDir + "/" + $sourceRelativeDir
    $targetDir = $targetBaseDir + "/" + $sourceRelativeDir

    If(-not (Test-Path $targetDir)){
        New-Item $targetDir -ItemType Directory
    }

    $items = Get-ChildItem $sourceDir -File

    foreach ($item in $items) {
        $source = $sourceDir + "/" + $item.Name
        $target = $targetDir + "/" + $item.Name
        
        CopySampleHtml $source $target $depth $isCDN        
    }
    $dir_items = Get-ChildItem $sourceDir -Directory
    foreach ($dir_item in $dir_items) {
        $nextRelativeSourceDir = $sourceRelativeDir + "/" + $dir_item.Name
        CopySampleDirectory $nextRelativeSourceDir $targetBaseDir ($depth + 1) $isCDN
    }
    
}

CopySampleDirectory "" $cdnOutputDir 1 $true
CopySampleDirectory "" $debugOutputDir 1 $false

<#

#>