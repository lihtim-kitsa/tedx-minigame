Add-Type -AssemblyName System.Drawing

$src = "C:\Users\astik\OneDrive\Desktop\tedx-minigame\public\X.png"
$dest = "C:\Users\astik\OneDrive\Desktop\tedx-minigame\app\icon.png"

$img = [System.Drawing.Image]::FromFile($src)
$bitmap = New-Object System.Drawing.Bitmap(64, 64)
$g = [System.Drawing.Graphics]::FromImage($bitmap)

$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.DrawImage($img, 0, 0, 64, 64)

$bitmap.Save($dest, [System.Drawing.Imaging.ImageFormat]::Png)

$g.Dispose()
$bitmap.Dispose()
$img.Dispose()
