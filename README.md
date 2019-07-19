<div>
  <div>
<img src="https://raw.githubusercontent.com/caglardurmus/BarcodeScanner/master/Myapp.gif" alt="demo" style="max-width:100%;" align="left"></div>

<div>
<h2 align="center"> Barcode Scanner </h2> 
<p align="center">This is a barcode scanner example developed with react-native.</p>
<h2>Notes</h2> 

  <p><span style="font-weight: 900;"> - </span>If you gongto create your own project dont forget to install <b>react-native-camera</b> </br>
  npm install --save react-native-camera@git+https://git@github.com/react-native-community/react-native-camera.git</p></br>
  <p><span style="font-weight: 900;"> - </span>Add permission(for android) </p>
  &lt;uses-permission android:name="android.permission.CAMERA" /&gt;</li></br>
   <p><span style="font-weight: 900;"> - </span>Add this code to android/app/build.gradle</p></br>
  <pre><code>android {
  ...
  defaultConfig {
    ...
    missingDimensionStrategy 'react-native-camera', 'general' &lt;-- insert this line
  }
}
</code></pre>
</div>
</div>
