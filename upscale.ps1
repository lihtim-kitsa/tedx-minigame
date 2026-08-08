Add-Type -AssemblyName System.Drawing

$publicDir = "C:\Users\astik\OneDrive\Desktop\tedx-minigame\public"
$files = Get-ChildItem -Path $publicDir -File | Where-Object { $_.Extension -match "\.(jpg|jpeg|png)$" }

foreach ($file in $files) {
    if ($file.Name -match "^(icon\.png|favicon\.ico|vercel\.svg|next\.svg)$") { continue }
    
    $src = $file.FullName
    Write-Host "Processing $($file.Name)..."
    
    $img = $null
    try {
        $img = [System.Drawing.Image]::FromFile($src)
        
        # Upscale if under a certain size to prevent exploding memory for already large images
        if ($img.Width -lt 1000) {
            $newWidth = $img.Width * 2
            $newHeight = $img.Height * 2
            
            $bitmap = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
            $g = [System.Drawing.Graphics]::FromImage($bitmap)
            $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
            $g.DrawImage($img, 0, 0, $newWidth, $newHeight)
            
            $img.Dispose()
            $img = $null
            
            $tempPath = $src + ".tmp"
            if ($file.Extension -match "\.png$") {
                $bitmap.Save($tempPath, [System.Drawing.Imaging.ImageFormat]::Png)
            } else {
                $bitmap.Save($tempPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
            }
            
            $g.Dispose()
            $bitmap.Dispose()
            
            Move-Item -Path $tempPath -Destination $src -Force
            Write-Host "Upscaled $($file.Name) to $($newWidth)x$($newHeight)"
        } else {
            Write-Host "Skipped $($file.Name) - already large ($($img.Width)px)"
            $img.Dispose()
        }
    } catch {
        Write-Host "Failed to process $($file.Name): $_"
        if ($null -ne $img) { $img.Dispose() }
    }
}
