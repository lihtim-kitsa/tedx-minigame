Add-Type -AssemblyName System.Drawing

$src = "C:\Users\astik\OneDrive\Desktop\tedx-minigame\public\WillDavis.jpg"
$img = [System.Drawing.Image]::FromFile($src)

$newWidth = $img.Width * 4
$newHeight = $img.Height * 4

$bitmap = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
$g = [System.Drawing.Graphics]::FromImage($bitmap)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.DrawImage($img, 0, 0, $newWidth, $newHeight)

$img.Dispose()

$tempPath = $src + ".tmp"
$bitmap.Save($tempPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)

$g.Dispose()
$bitmap.Dispose()

Move-Item -Path $tempPath -Destination $src -Force
Write-Host "Upscaled WillDavis.jpg to $($newWidth)x$($newHeight)"
