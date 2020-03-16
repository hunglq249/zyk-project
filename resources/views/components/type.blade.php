@extends('layouts.client')

@section('page_title')
    Typography
@endsection

@section('view')
    <div class="container-fluid">
        <div class="section section-type">
            <div class="section-header">
                <h3>Typography</h3>
            </div>

            <div class="section-body">
                <table class="table table-borderless">
                    <thead>
                        <tr>
                            <th>
                                Heading
                            </th>

                            <th>
                                Font size
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><h1>H1. Heading</h1></td>
                            <td><p class="p-sm">6rem | 96px</p></td>
                        </tr>
                        <tr>
                            <td><h2>H2. Heading</h2></td>
                            <td><p class="p-sm">3.75rem | 60px</p></td>
                        </tr>
                        <tr>
                            <td><h3>H3. Heading</h3></td>
                            <td><p class="p-sm">3rem | 48px</p></td>
                        </tr>
                        <tr>
                            <td><h4>H4. Heading</h4></td>
                            <td><p class="p-sm">2.125rem | 34px</p></td>
                        </tr>
                        <tr>
                            <td><h5>H5. Heading</h5></td>
                            <td><p class="p-sm">1.5rem | 24px</p></td>
                        </tr>
                        <tr>
                            <td><h6>H6. Heading</h6></td>
                            <td><p class="p-sm">1.25rem | 20px</p></td>
                        </tr>
                        <tr>
                            <td><h6 class="subtitle-md">H6. Heading (Subtitle)</h6></td>
                            <td><p class="p-sm">1rem | 16px</p></td>
                        </tr>
                        <tr>
                            <td><h6 class="subtitle-sm">H6. Heading (Subtitle)</h6></td>
                            <td><p class="p-sm">0.875rem | 14px</p></td>
                        </tr>
                        <tr>
                            <td><p>P. Paragraph</p></td>
                            <td><p class="p-sm">1rem | 16px</p></td>
                        </tr>
                        <tr>
                            <td><p class="p-sm">P. Paragraph (Small)</p></td>
                            <td><p class="p-sm">0.875rem | 14px</p></td>
                        </tr>
                        <tr>
                            <td><p class="p-caption">P. Paragraph (Caption)</p></td>
                            <td><p class="p-sm">0.75rem | 12px</p></td>
                        </tr>
                        <tr>
                            <td><p class="p-overline">P. Paragraph (Overline)</p></td>
                            <td><p class="p-sm">0.625rem | 10px</p></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    {{-- <div class="popup-backdrop"></div> --}}
@endsection